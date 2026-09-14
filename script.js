const STORAGE_KEY = 'student_records';

function loadRecords() {
  try {
    const records = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(records) ? records : [];
  } catch (error) {
    return [];
  }
}

function saveRecords(records) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

function addRecord(data) {
  const records = loadRecords();
  const nextNumber = records.reduce((highest, record) => {
    const number = Number.parseInt(String(record.id).replace(/\D/g, ''), 10);
    return Number.isNaN(number) ? highest : Math.max(highest, number);
  }, 0) + 1;
  const record = {
    id: `STU-${String(nextNumber).padStart(3, '0')}`,
    ...data
  };

  records.push(record);
  saveRecords(records);
  return record;
}

function updateRecord(id, changes) {
  const records = loadRecords();
  const index = records.findIndex(record => record.id === id);
  if (index === -1) return false;

  records[index] = { ...records[index], ...changes };
  saveRecords(records);
  return true;
}

function deleteRecord(id) {
  const records = loadRecords().filter(record => record.id !== id);
  saveRecords(records);
}

function getRecordById(id) {
  return loadRecords().find(record => record.id === id) || null;
}

function qs(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function statusClass(status) {
  return status.toLowerCase().replace(/\s+/g, '-');
}
