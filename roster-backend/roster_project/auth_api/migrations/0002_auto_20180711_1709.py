# Generated by Django 2.0.5 on 2018-07-11 17:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('auth_api', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userprofilemodel',
            old_name='is_admin_user',
            new_name='is_staff',
        ),
    ]
