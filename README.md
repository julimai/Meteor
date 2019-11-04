# Meteor
https://www.meteor.com

# Gift List

Simple online list for wedding gifts etc. 
Every guest can register itself as user.
Each user can have its' own list and choose, witch gift is visible to all other guest.

## Step-by-step


#### Install:
 Windows:
```
 choco install meteor 
```

 OSX/Linux:
```
curl https://install.meteor.com/ | sh
```


#### Creating the project:
```
 meteor create giftlist
 ```


#### In the project folder
```
 meteor npm install
 ```


#### To run the project (http://localhost:3000)
```
 meteor
 ```


#### Optional - To use the server database console  
```
 meteor mongo
 ```
Adding data from console:
```
 db.gifts.insert({ text: "Ilus kingitus!", createdAt: new Date() });
 ```

#### Data filtering - to store temporary reactive state on the client 

```
 meteor add reactive-dict
 ```

#### To enable the accounts system and UI

```
 meteor add accounts-ui accounts-password
 ```


#### Denying database editing from the client

```
 meteor remove insecure
 ```

#### Storing privacy-sensitive data.

```
 meteor remove autopublish
```







## Authors

* **Grete Ojavere** 
* **Julika Maiste** 
