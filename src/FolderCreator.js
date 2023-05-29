import React, { useEffect } from 'react';
import fs from 'fs-extra';

const FolderCreator = () => {
  useEffect(() => {
    const createFolder = async () => {
      try {
        await fs.ensureDir('/');
        console.log('Folder created!');
      } catch (error) {
        console.error('Error creating folder:', error);
      }
    };

    createFolder();
  }, []);

  return <div>Folder creation in progress...</div>;
};

export default FolderCreator;
