"""
Django settings for roster_project project.

Generated by 'django-admin startproject' using Django 2.0.5.

For more information on this file, see
https://docs.djangoproject.com/en/2.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.0/ref/settings/
"""

import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
from .settings_api import secrets
SECRET_KEY = secrets.DJANGO_SECRET_KEY



# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = ['192.168.1.6', 'localhost', '192.168.43.246', '192.168.1.7']


# Application definition

INSTALLED_APPS = [

    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',
    'auth_api',
    'roster_api',

]
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    )
}


MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',

]

ROOT_URLCONF = 'roster_project.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'roster_project.wsgi.application'



# Database
# https://docs.djangoproject.com/en/2.0/ref/settings/#databases


if DEBUG:
    from .settings_api.dev import db_settings
    DATABASES = {
        'default': {
            'ENGINE': db_settings.ENGINE_SETTINGS,
            'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        }
    }
else:
    from .settings_api.prod import db_settings
    DATABASES = {
        'default': {
            'ENGINE': db_settings.ENGINE_SETTINGS,
            'NAME': db_settings.NAME_SETTINGS,
            'HOST': db_settings.HOST_SETTINGS,
            'PORT': db_settings.PORT_SETTINGS,
            'USER': db_settings.USER_SETTINGS,
            'PASSWORD': db_settings.PASSWORD_SETTINGS,
        }
    }

#
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
#     }
# }
#
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.mysql',
#         'NAME': 'roster123',
#         'HOST': 'testrosterinstance.crdre4odblr5.us-east-1.rds.amazonaws.com',
#         'PORT': '3306',
#         'USER': 'roster123',
#         'PASSWORD': 'roster123',
#     }
# }



# Password validation
# https://docs.djangoproject.com/en/2.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]



# Internationalization
# https://docs.djangoproject.com/en/2.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.0/howto/static-files/



STATIC_URL = '/static/'

AUTH_USER_MODEL = 'auth_api.UserProfileModel'

if DEBUG:
    from .settings_api.dev import email_settings
else:
    from .settings_api.prod import email_settings

EMAIL_USE_TLS = email_settings.EMAIL_USE_TLS_SETTINGS
EMAIL_HOST = email_settings.EMAIL_HOST_SETTINGS
EMAIL_HOST_USER = email_settings.EMAIL_HOST_USER_SETTINGS
EMAIL_HOST_PASSWORD = email_settings.EMAIL_HOST_PASSWORD_SETTINGS
EMAIL_PORT = email_settings.EMAIL_PORT_SETTINGS
FROM_EMAIL = email_settings.FROM_EMAIL_SETTINGS
# CORS Config
# CORS_ORIGIN_ALLOW_ALL = True

if DEBUG:
    from .settings_api.dev import cross_origin_settings
else:
    from .settings_api.prod import cross_origin_settings

CORS_ORIGIN_WHITELIST = cross_origin_settings.CORS_ORIGIN_WHITELIST_SETTINGS

from corsheaders.defaults import default_methods, default_headers

CORS_ALLOW_METHODS = default_methods
CORS_ALLOW_HEADERS = default_headers + ('No-Auth',)

# TOKEN EXPIRATION HOUR
TOKEN_EXPIRATION_HOUR = 5
