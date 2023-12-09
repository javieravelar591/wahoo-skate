const express = require('express');
const basicAuth = require('express-basic-auth')
const data = require('./data')
const app = express();
const port = 4131;

// let contacts = []
// let next_id = 0;
// let banner_message = "Flash Sale Happening Now, 1/2 off select items"
// let show_banner = true

app.set('views', 'templates')
app.set('view engine', 'pug');

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use('/resources', express.static('resources'))



let authMiddleware = basicAuth({
    users: {
        'admin': 'password'
    },
    challenge: true
})

app.get('/', (req, res) => {
    res.status(200).render('mainpage.pug')
})

app.get('/main', (req, res) => {
    res.status(200).render('mainpage.pug')
})


app.get('/testimonies', (req, res) => {
    res.status(200).render('testimonies.pug')
})

app.get('/contact', (req, res) => {
    res.status(200).render('contactform.pug')
})


app.get('/admin/contactlog', authMiddleware, async (req, res) => {
    let contacts = await data.getContacts();
    res.status(200).render('contactlog.pug', { contacts })
})

app.get('/admin/salelog', authMiddleware, async (req, res) => {
    let recent_sales = await data.getRecentSales();
    res.json(recent_sales);
})

app.get('/api/sale', async (req, res) => {
    // let banner_data = {}
    // if (show_banner == true) {
    //     banner_data['active'] = show_banner
    //     banner_data['message'] = banner_message
    //     res.json(banner_data)
    // } else {
    //     banner_data['active'] = false
    //     banner_data['message'] = "No sale happening"
    //     res.json(banner_data)
    // }
    let recent_sales = await data.getRecentSales();
    if (recent_sales.length <= 0) {
        res.json({message: "No sale happening", sale_active: false});
    }
    else {
        let most_recent = recent_sales[0];
        if (most_recent.sale_active) {
            let sale_data = { message: most_recent.sale_text, active: true, time_started: most_recent.time_started, time_ended: most_recent.time_ended};
            res.json(sale_data);
        }
        else {
            res.json({message: "No sale happening", sale_active: false});
        }
    }
})

// POST
// HANDLE IF REQUIRED INPUT NOT ADDED
app.post('/contact', async (req, res) => {
    // if (is_valid_post(req.body)) {
    //     req.body['next-id'] = next_id
    //     contacts.push(req.body)
    //     // contacts.push({'next-id': next_id})
    //     next_id = next_id + 1
    //     res.status(200).render('postsuccess.pug', { contacts })
    // } else {
    //     res.status(400).render('postfail.pug')
    // }
    // console.log(req.body);
    // next_id =next_id + 1;
    let {name, email, 'date-select': date, 'xp-select': xp} = req.body;
    data.addContact(name, email, date, xp);
    res.status(200).render('postsuccess.pug')
})

app.post('/api/sale', async (req, res) => {
    let sale_message = req.body.message;
    let result = data.addSale(sale_message);
})

// DELETE

app.delete('/api/contact', async (req, res) => {
    // console.log(req.body.next_id);
    // let test = req.body.next_id;
    // console.log(test)
    let id = parseInt(req.body.next_id);
    console.log(id);
    await data.deleteContact(id);
    res.status(200).send("Successfully removed from list")

    // for(let i = 0; i < contacts.length; i++) {
    //     if(id === parseInt(contacts[i]['next-id'])) {
    //         console.log("IN IF")
    //         // use splice or filter here
    //         // contacts.splice(i, 1)
    //         let result = await data.deleteContact(id)
    //         console.log(result)
    //         res.status(200).send("Successfully removed from list")
    //     }
    //     else {
    //         res.status(404).end();
    //     }
    //     // console.log(contact)
    // }
})

app.delete('/api/sale', async (req, res) => {
    // show_banner = false
    // banner_message = "Sale has ended"
    let result = await data.endSale();
    // console.log(result);
    res.status(200).send("Sale ended successfully")
})

app.use((req, res) => {
    res.status(404).render('404.pug')
})

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})