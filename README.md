# cdv-oauth-visualisation-project
This project aims to visualise how O'Auth 2.0 works

# Usage
You'll need node.js installed locally before start.

1. Clone repo tom your local directory.
2. Install node dependencies
```
npm install
```
3. Create 'keys.js' file at <root_directory>/config/keys.js
4. Put into file
You'll need there credentials to database at mongoDB and googleAPI data (client_id and client_secret).
You can get these google data by turning on PeopleAPI at your developer account.

```javascript
module.exports = {
	google: {
		client_id: <your_client_id>
		client_secret: <your_client_secret>
	},
	mongodb: {
		dbURI: <mongo_db_uri>,
	},
	session: {
		cookieKey: <random_string_to_encrypt_cookies>,
	},
};
```

5. As you configure keys - you can run app
```
npm start
```
