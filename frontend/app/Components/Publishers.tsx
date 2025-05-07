import React, { useEffect, useState } from 'react'
import { Link } from 'react-router';
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

    <div className="publishers-container bg-gray-50 py-8 px-4">
      <h2 className='text-center text-3xl mb-6 text-cyan-700 font-bold'>Lista de Editoriales</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {publishers.map((publisher) => (
          <Link to={`/publisherDetails/${publisher.id}`} key={publisher.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={publisher.logoUrl}
              alt={publisher.name}
              className="w-full h-74 object-contain"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-cyan-600 truncate">{publisher.name}</h3>
              <p className="text-gray-600 text-sm my-2">Teléfono: {publisher.telephone}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>

    )
}


export default Publishers