import React, { useEffect, useState } from 'react'
import { getAllPublishers } from '~/Services/functions';
import type { PublisherDTO } from '~/Types/interfaces'

const Publishers : React.FC = () => {
    
    const [publishers,setPublishers] = useState<PublisherDTO[]>([]);

    useEffect(() =>{
        const fetchPublishers = async () => {
            const data = await getAllPublishers();
            setPublishers(data);
        };
        fetchPublishers();
    },[])

    return(

    <div className="publishers-container">
      <h2>Lista de Editoriales</h2>
      <ul>
        {publishers.map((publisher) => (
          <li key={publisher.id}>
            <h3>{publisher.name}</h3>
            <img src={publisher.logoUrl} alt={publisher.logoUrl} width={150} />
            <p>{publisher.province}</p>
            <p>Precio: {publisher.telephone}€</p>
          </li>
        ))}
      </ul>
    </div>

    )
}


export default Publishers