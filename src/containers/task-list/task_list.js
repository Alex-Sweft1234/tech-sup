import React from 'react';
import TaskItem from '../../components/task_item/task_item.js';

export default function TaskList (props) {
    return(
        <div>
            {
                props.data.map((e, index) => {
                    return  <div style={{marginBottom: 3}}>
                                <TaskItem 
                                    key={index}
                                    id={e.id}
                                    taskname={e.taskname}
                                    date={e.date}
                                    descript={e.descript}
                                    status={e.status}
                                />
                            </div>
                })
            }
        </div>
    )
}