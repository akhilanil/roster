# Generated by Django 2.0.5 on 2018-07-23 17:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('roster_api', '0001_initial'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='userrostermodel',
            unique_together={('user_name', 'month', 'year', 'title')},
        ),
    ]
