const EventEmitter = require('events');
const fs = require('fs').promises;
const path = require('path');

class DB extends EventEmitter {
  constructor() {
    super();
    this.dataFilePath = path.join(__dirname, 'dbData.json');
    this.loadData();
  }

  async loadData() {
    try {
      const fileContent = await fs.readFile(this.dataFilePath, 'utf-8');
      this.data = JSON.parse(fileContent);
    } catch (error) {
      this.data = [];
    }
  }

  async saveData() {
    await fs.writeFile(this.dataFilePath, JSON.stringify(this.data, null, 2), 'utf-8');
  }

  async select() {
    this.emit('GET', this.data);
    return this.data;
  }

  async insert(name, bday) {
    const newRow = {
      id: this.getNextId(),
      name: name,
      bday: bday,
    };
    this.data.push(newRow);
    await this.saveData();
    this.emit('POST', newRow);
    return newRow;
  }

  async update(id, newName, newBday) {
    const existingRow = this.findById(id);
    if (existingRow) {
      existingRow.name = newName;
      existingRow.bday = newBday;
      await this.saveData();
      this.emit('PUT', existingRow);
      return existingRow;
    } else {
      this.emit('PUT', null);
      return null;
    }
  }

  async delete(id) {
    const existingRow = this.findById(id);
    if (existingRow) {
      const index = this.data.indexOf(existingRow);
      this.data.splice(index, 1);
      await this.saveData();
      this.emit('DELETE', existingRow);
      return existingRow;
    } else {
      this.emit('DELETE', null);
      return null;
    }
  }

  findById(id) {
    return this.data.find(item => item.id == id);
  }

  getNextId() {
    const maxId = this.data.reduce((max, item) => (item.id > max ? item.id : max), 0);
    return maxId + 1;
  }
}

module.exports = DB;
