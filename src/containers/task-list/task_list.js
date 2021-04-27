import React from 'react';
import TaskItem from '../../components/task_item/task_item.js';

export default function TaskList (props) {

    let countPage = props.dataPage * 10;
    const datafilter = props.data.filter(e => e.id <= countPage && e.id >= countPage - 9 );

    return(
        <div>
            {
                datafilter.map(e => {
                    return  <TaskItem 
                                key={e.keytask}
                                keytask={e.keytask}
                                id={e.id}
                                taskname={e.subject}
                                dateStart={e.dateStart}
                                timeStart={e.timeStart}
                                descript={e.description}
                                status={e.status}
                            />
                })
            }
        </div>
    )
}