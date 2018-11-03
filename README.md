# TeamRoster

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

TeamRoster is a webapp for building rosters for your team.

  - Signup for free.
  - Give your session name , team members name and enter submit.
  - Voila... Your roster is prepared. Share it among your team. 


### Tech

TeamRoster uses a the following technologies: 

* [Angular] - Latest angular framework by Google
* [Django] - Open source Python web framework
* [Angular Material] - Angular material UI design
* [Django Rest Framework] - Restframework powered by Django


And of course TeamRoster itself is open source.

### Development
Why don't you contribute. Pull requests are always welcomed.

With few steps you can configure the app in your local machine. 

#### Client
    Setup the environment.ts file by giving your client and server domain address.
    
Then do:
```sh
$ npm install
```
Run your client using 
```sh
$ ng serve
```

#### Server (DEV setup)
- Give your client domain adress in cross_origin_dev.py file
- Give your database settings in database_settings_dev.py file
- Give you email settings in email_settings.py file
- In settings.py enter your server domain address in ALLOWED_HOSTS
 
Make your migrations using : 
```
$ python manage.py makemigrations
$ python manage.py migrate
```
Run your server using :
```
$ python manage.py runserver
```

### Requirements

 - Node v10.10.0
 - npm 6.4.1
 - python 3
 - Django 2.0.5

License
----

MIT




   [Angular]: <https://angular.io/>
   [Django]: <https://www.djangoproject.com/>
   [Angular Material]: <https://material.angular.io/>
   [Django Rest Framework]: <https://www.django-rest-framework.org/>
    
