// this package behaves just like the mysql one, but uses async await instead of callbacks.
const mysql = require(`mysql-await`); // npm install mysql-await

// first -- I want a connection pool: https://www.npmjs.com/package/mysql#pooling-connections
// this is used a bit differently, but I think it's just better -- especially if server is doing heavy work.
var connPool = mysql.createPool({
  connectionLimit: 5, // it's a shared resource, let's not go nuts.
  host: "127.0.0.1",// this will work
  user: "",
  database: "",
  password: "", // we really shouldn't be saving this here long-term -- and I probably shouldn't be sharing it with you...
});

// later you can use connPool.awaitQuery(query, data) -- it will return a promise for the query results.

async function addContact(name, email, date, xp, next_id){
    // you CAN change the parameters for this function. please do not change the parameters for any other function in this file.
    return await connPool.awaitQuery("INSERT INTO contact (name, email, `date-select`, `xp-select`) values (?, ?, ?, ?)", [name, email, date, xp]);
}

async function deleteContact(id){
    return await connPool.awaitQuery("DELETE FROM contact where id=?", [id]);
}

async function getContacts() {
    // let contact = await connPool.awaitQuery("select * from contact");
    // console.log(contact);
    return await connPool.awaitQuery("SELECT * FROM contact");
}

async function addSale(message) {
    return await connPool.awaitQuery("INSERT INTO sale (sale_text, sale_active) values (?, ?)", [message, true]);
}

async function endSale() {
    return await connPool.awaitQuery("UPDATE sale SET time_ended=CURRENT_TIMESTAMP, sale_active=false WHERE sale_active=true");
}

async function getRecentSales() {
    return await connPool.awaitQuery("SELECT * FROM sale ORDER BY time_started DESC LIMIT 3");
    // return await connPool.awaitQuery("SELECT * FROM sale LIMIT 3");
}

module.exports = {addContact, getContacts, deleteContact, addSale, endSale, getRecentSales}