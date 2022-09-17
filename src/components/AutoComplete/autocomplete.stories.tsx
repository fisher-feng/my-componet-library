import React from "react";
import AutoComplete, {DataSourceType} from "./autocomplete";
import {ComponentMeta} from '@storybook/react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas);
const autoCompleteMeta:ComponentMeta<typeof AutoComplete> =  {
  title:'AutoComplete',
  id:'AutoComplete',
  component:AutoComplete,
}
export default autoCompleteMeta;

// interface LakerPlayerProps{
//   value:string;
//   number:number;
// }

interface LakerPlayerProps2{
  login:string;
  url:number;
  avatart_url:string;
}
export const BCustomComplete = () => {
  const lakersWithNumber  =  [
    {value:'value1',number:1},
    {value:'value2',number:3},
    {value:'value3',number:4},
    {value:'value4',number:5},
  ]
  const handleFetcha = (query:string) => {
    return lakersWithNumber.filter(player => player.value.includes(query))
  } 
  
  const handleFetchb = (query:string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then((res) =>  {
        return res.json();
      }).then(({items}) => {
        console.log(items);
        const formatItems = items?.slice(0, 10)?.map((item: any ) => {
          return {
            value:item.login,
            ...item,
          }
        })
        return formatItems
      }
    )
  }
  
  const renderOption = (item:DataSourceType) => {
    const itemWithNumber = item as DataSourceType<LakerPlayerProps2>
    return (
      <>
        <b>name:</b> {itemWithNumber.login} &nbsp;
        <span><b>url</b>: {itemWithNumber.url}</span>
      </>
    )
  }
  return (
    <AutoComplete  
      fetchSuggestions={handleFetchb}
      onSelect = {(value) => {
        console.log(value);
      }}
      renderOption = {renderOption}
      style = {{width:400}}
      placeholder = '随便输入试试'
    />
  )
}

BCustomComplete.storyName = '2 自定义搜索结果模版'
