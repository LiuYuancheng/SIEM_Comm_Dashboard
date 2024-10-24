# **Problem and Solution**

**In this document we will share the valuable problems and the solution we meet during the project development as a reference menu for the new programmer who may take over this project for further development. Later we will sort the problem based on the problem <type>.**

[TOC]

**Format:** 

**Problem**: (Situation description)

**OS Platform** :

**Error Message**:

**Type**: Setup exception

**Solution**:

**Related Reference**:

------

### Problem and Solution

###### Problem[1] **:** Can check the web page from localhost but can not view by use the IP address

**OS Platform** : Windows/Linux

**Error Message**: N.A 

On host machine the user can access with the url http://localhost:4200/ , when connect the host computer to network other computer can not access the url with the ulr http://ip:4200/

**Type**: Config issue.

**Solution**:

You can use the following command to access with your ip.

```js
ng serve --host 0.0.0.0 --disable-host-check
```

If you are using npm and want to avoid running the command every time, we can add the following line to the **package.json** file in the **scripts** section.

```js
"scripts": {
    ...
    "start": "ng serve --host 0.0.0.0 --disable-host-check"
    ...
}
```

Then you can run you app using the below command to be accessed from the other system in the same network.

```js
npm start
```

