import React from 'react'

export default function About() {
    const foTest = [
        {id: 1, title: 'title-1', completed: false },
        {id: 2, title: 'title-2', completed: true }
      ];
  
      // {forTest.map((todo) => {
      //   return (<Todo todo={todo}/>)
      // })}
      const RecordData = ({todo}) => {
          const { id, title, completed } = todo;
          const h1 = <h1>{title}</h1>
          const text = completed ? <strike>{h1}</strike> : h1;
          return <div data-testid={`todo-${id}`}>{ text }</div>
    }
    return (
        <div>
            {foTest.map((item) => {
                return (<RecordData todo={item} key={item.id}/>)
            })}
        </div>
    )

    
}
