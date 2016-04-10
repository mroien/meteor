# Meteor Project

[Meteor Creating an app](https://www.meteor.com/tutorials/blaze/creating-an-app)

[Meteor Project Github](https://github.com/meteor)

[Meteor Project Github](https://github.com/meteor/simple-todos)

### Import
- All logic goes in _import_ folders

### HTML

In html `{{> hello }}` references a template tag with the name _hello_
Templates go after the _body tag_
You make new/ separate HTML files for templates 

### Run Browser App

Spin up local meteor sever running on http://localhost:3000 run the command `meteor`

### Run iOS App

[Meteor App Run on Mobile](https://www.meteor.com/tutorials/blaze/running-on-mobile)

In _app folder i.e. simple-todos_ run the command `meteor run ios`. This will spin up the server for iOS. 

### Adding User Accounts

Meteor comes with a [drop-in login user interface](https://www.meteor.com/tutorials/blaze/adding-user-accounts) that lets you add multi-user functionality to your app in minutes -- Meteor

- In your _app_ directory run the command:

```
meteor add accounts-ui accounts-password
```

- In your JavaScript code, you can use `Meteor.userId()` to get the current user's _id, or `Meteor.user()` to get the whole user document.
- You can also run the command `meteor add accounts-facebook` to enable Facebook login

### Remove insecure and autopublish

Insecure is added to every newly created Meteor project by default. This allows packages to edit the database from the client side. To remove this run the command:

```
meteor remove insecure
```
After running this command none of the buttons or inputs work anymore, because all client-side database permissions have been revoked.

Then you will have to remove _autopublish_ package:

```
meteor remove autopublish
```

This removes the _task list_. You will have to explicitly tell the server what to send to the client. With `Meteor.publish` and `Meteor.subscribe`

### Testing

Testing with _Mocha_ run command:

```
meteor add practicalmeteor:mocha
```
then run the test with `meteor test --driver-package practicalmeteor:mocha`

### Other Steps
- Add [ReactiveDict](https://www.meteor.com/tutorials/blaze/temporary-ui-state) in _app folder_

```
meteor add reactive-dict
```
- ReactiveDicts are reactive data stores for the client
- `$ne:` means _not equal to_
- use another port with `--port XYZ`


---

[Tim Oien](oien.tim@gmail.com)

[Linkedin](https://www.linkedin.com/in/timothy-oien-20699394)