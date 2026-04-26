const db = require('./config/db');

const addColumns = () => {
  const query1 = "ALTER TABLE rooms ADD COLUMN is_suspicious BOOLEAN DEFAULT FALSE";
  const query2 = "ALTER TABLE rooms ADD COLUMN suspicious_reason TEXT";

  db.query(query1, (err) => {
    if (err && err.code !== 'ER_DUP_FIELDNAME') {
      console.log('Error adding is_suspicious:', err);
    } else {
      console.log('Added is_suspicious');
    }
    
    db.query(query2, (err) => {
      if (err && err.code !== 'ER_DUP_FIELDNAME') {
        console.log('Error adding suspicious_reason:', err);
      } else {
        console.log('Added suspicious_reason');
      }
      process.exit();
    });
  });
};

addColumns();
