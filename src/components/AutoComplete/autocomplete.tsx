import React, { ChangeEvent, ReactElement, useEffect, useState, KeyboardEvent, useRef} from "react";
import Input, {InputProps} from "../Input/input";
import classNames from "classnames";
import Icon from "../Icon/icon";
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from "../../hooks/useClickOutside";

interface DataSourceObject{
  value:string;
}
export type DataSourceType<T = {}> = T & DataSourceObject  
export interface AutoCompleteProps extends Omit< InputProps,'onSelect'> {
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?:(item:DataSourceType) => void;
  renderOption?:(item:DataSourceType) => ReactElement;
}

export const AutoComplete:React.FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect, 
    value, 
    renderOption,
    ...resProps
  } = props;
  const classese = classNames('viking-auto-complete');
  const [inputValue, setInputValue] = useState(value as string);
  const [suggestions, setSuggesions] = useState<DataSourceType[]>([]);
  const [loading, setLoading] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const triggerSearch = useRef(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const debouncedValue = useDebounce(inputValue, 300)
  useClickOutside(componentRef, (event:MouseEvent) => {
    setSuggesions([]);
  });
  useEffect(() => {
    if(inputValue && triggerSearch.current) {
      const results = fetchSuggestions(inputValue);
      if(results instanceof Promise) {
        console.log('triggered');
        setLoading(true);
        results.then((data) => {
          setLoading(false);
          setSuggesions(data);
        })
      }else {
        setSuggesions(results);
      }
    }else {
      setSuggesions([]);
    }
    setHighlightIndex(-1);
  }, [debouncedValue])
  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    triggerSearch.current = true;
  }
  const handleSelect = (item:DataSourceType) => {
    setInputValue(item.value);
    setSuggesions([]);
    if(onSelect) {
      onSelect(item);
    }
    triggerSearch.current = false;
  }
  const renderTemplate = (item:DataSourceType) => {
    return renderOption?renderOption(item) : item.value;
  }
  const generateDropdown = () => {
    return (
      <ul>
        {suggestions.map((item, index) => {
          const className = classNames('suggestion-item', {
            'item-highlight':index === highlightIndex,
          })
          return (
            <li 
              key={index}
              className={className}
              onClick = {() => {handleSelect(item)}}
            >
              {renderTemplate(item)}
            </li>
          )
        })}
      </ul>
    )
  }
  const lighlight = (index:number) => {
    if(index < 0) {
      index = 0;
    }else if(index >= suggestions.length) {
      index = suggestions.length;
    }
    setHighlightIndex(index);
  }
  const handleKeyDown = (e:KeyboardEvent<HTMLInputElement>) => {
    switch(e.key) {
      case 'Enter':
        if(suggestions[highlightIndex]) {
          setInputValue(suggestions[highlightIndex].value);
          triggerSearch.current = false;
        }
        break;
      case 'ArrowUp': 
        lighlight(highlightIndex - 1);
        break;
      case 'ArrowDown':
        lighlight(highlightIndex + 1);
        break;
      case 'Escape': 
        setSuggesions([]);
        break;
      default: break;
    }
  }
  return (
    <div  className= {classese} ref={componentRef}>
      <Input
        value = {inputValue}
        {...resProps}
        onChange = {handleChange}
        onKeyDown = {handleKeyDown}
      />
      {loading&& <ul><Icon icon='spinner' spin/></ul> }
      {setSuggesions.length >0  && generateDropdown()}
    </div>
  )
}

export default AutoComplete