import { useState, useEffect } from 'react';

const useDatabase = (databaseService, collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const results = await databaseService.getCollection(collectionName);
      setData(results);
      setLoading(false);
    };

    fetchData();
  }, [databaseService, collectionName]);

  const addItem = async (item) => {
    await databaseService.addToCollection(collectionName, item);
    setData((prevData) => [...prevData, item]);
  };

  const updateItem = async (id, updatedItem) => {
    await databaseService.updateInCollection(collectionName, id, updatedItem);
    setData((prevData) =>
      prevData.map((item) => (item.id === id ? updatedItem : item))
    );
  };

  const deleteItem = async (id) => {
    await databaseService.deleteFromCollection(collectionName, id);
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  return { data, loading, addItem, updateItem, deleteItem };
};

export default useDatabase;
