export const validateAddProducts = (body) => {
    const obligatoryProperties = [
      'title',
      'description',
      'code',
      'price',
      'stock',
      'category',
    ];
    for (const property of obligatoryProperties) {
      if (!(property in body)) {
        return property;
      }
    }
    return null;
  };
  
  export const validateEditProducts = (body) => {
    const editedProperties = body;
  
    const allowedProperty = [
      'title',
      'description',
      'code',
      'price',
      'stock',
      'category',
    ];
    for (const key in editedProperties) {
      if (!allowedProperty.includes(key)) {
        delete editedProperties[key];
      }
    }
    return editedProperties;
  };