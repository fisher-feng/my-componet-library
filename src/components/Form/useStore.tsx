import React, {useState, useReducer} from "react"
import Schema, {RuleItem, ValidateError} from 'async-validator'
import {mapValues, each} from 'lodash-es'

export type CustomRuleFunc = ({getFieldValue}:any) => RuleItem;
export type CustomRule = RuleItem | CustomRuleFunc;
export interface FieldDetail {
  name:string;
  value:string;
  rules:CustomRule[];
  isValid:boolean;
  errors:ValidateError[];
}
export interface FieldsState {
  [key:string]:FieldDetail;
}
export interface ValidateErrorType extends Error{
  errors:ValidateError[];
  fields:Record<string, ValidateError[]>
}
export interface FormState {
  isValid:boolean;
  isSubmitting:boolean;
  errors: Record<string, ValidateError[]>
}
export interface FiledsAction {
  type:'addField' | 'updateValue' | 'updateValidateResult';
  name:string;
  value:any;
}

function fieldsReducer(state:FieldsState, action:FiledsAction):FieldsState{
  const {isValid, errors} = action.value;
  switch (action.type) {
    case 'addField':
      return {
        ...state,
        [action.name]: {...action.value}
      }
    case 'updateValue':
      return {
        ...state,
        [action.name]:{...state[action.name], value:action.value}
      }  
    case 'updateValidateResult':
      return {
        ...state,
        [action.name]:{...state[action.name], isValid, errors}
      } 
    default:
      return state
  }
}
function useStore(initialValues?:Record<string, any>) {
  const [form, setform] = useState<FormState>({isValid:true, isSubmitting:false, errors:{}});
  const [fields, dispatch] = useReducer(fieldsReducer, {});
  const getFieldValue = (key:string) => {
    return fields[key] && fields[key].value;
  }

  const getFieldsValue = () => {
    return mapValues(fields, item => item.value);
  } 

  const setFieldValue = (name:string, value:any) => {
    if(fields) {
      dispatch({type:'updateValue', name, value});
    }
  }

  const resetFields = () => {
    if(initialValues) {
      each(initialValues, (value, name) => {
        if(fields[name]) {
          dispatch({type:'updateValue', name, value})
        }
      })
    }
  }
  const transformRules = (rules:CustomRule[]) => {
    return rules.map(rule => {
      if (typeof rule === 'function') {
        const calledRule = rule({getFieldValue});//??
        return calledRule;
      }else {
        return rule
      }
    })
  }

  const validateField = async (name:string) => {
    const {value, rules} = fields[name];
    const afterRules = transformRules(rules);
    const descriptor = {
      [name]:afterRules,
    }
    const valueMap = {
      [name]:value,
    }
    const validator = new Schema(descriptor);//验证规则描述
    let isValid = true;
    let errors:ValidateError[] = [];
    try {
      await validator.validate(valueMap);//验证valueMap是否与descriptor描述一致
    } catch (e) {
      isValid = false;
      const err = e as any;
      console.log('err', err.errors);
      console.log('fields', err.fields);
      errors = err.errors;
    } finally {
      console.log('errors', isValid);
      dispatch({type:'updateValidateResult',name, value:{isValid, errors}})
    } 
  }
  const validateAllField = async () => {
    let isValid = true;
    let errors: Record<string, ValidateError[]> =  {};
    const valueMap = mapValues(fields, item => item.value);//{name:value}
    const descriptor = mapValues(fields, item => transformRules(item.rules));
    const validator = new Schema(descriptor);
    setform({...form, isSubmitting:true});
    try {
       await validator.validate(valueMap); 
    } catch (e) {
      isValid = false ;
      const err = e as ValidateErrorType;
      errors = err.fields;
      each(fields, (value, name) => {
        //判断error中是否有对应key
        if(errors[name]) {
          const itemErrors = errors[name];
          dispatch({type:'updateValidateResult',name, value:{isValid:false, errors:itemErrors}});
        }else if(value.rules.length > 0 && !errors[name]) {
          dispatch({type:'updateValidateResult', name, value:{isValid:true, errors:{}}})
        }
        //有对应的rules，并没有errors
      })

    }finally {
      setform({...form, isSubmitting:false, isValid, errors});
      return {
        isValid,
        errors,
        values:mapValues,
      }
    }
  }
  return {
    fields,
    dispatch,
    form,
    validateField,
    getFieldValue,
    validateAllField,
    setFieldValue,
    getFieldsValue,
    resetFields,
  }
}

export default useStore
