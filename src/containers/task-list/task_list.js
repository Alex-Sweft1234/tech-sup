import React from 'react';
import TaskItem from '../../components/task_item/task_item.js';

export default function TaskList (props) {

    return(
        <div>
            {
                props.data.map(e => {
                    return  <TaskItem 
                                key={e.key}
                                id={e.id}
                                taskname={e.subject}
                                date={e.dateStart}
                                descript={e.description}
                                status={e.status}
                            />

                })
            }
        </div>
    )
}