import React from 'react';
import TaskItem from '../../components/task_item/task_item.js';

export default function Task (props) {
    return(
        <div>
            {
                props.data.map((e) => {
                    return  <div style={{marginBottom: 7}}>
                                <TaskItem 
                                    id={e.id}
                                    taskname={e.taskname}
                                    date={e.date}
                                    descript={e.descript}
                                />
                            </div>
                })
                
            }
        </div>
    )
}