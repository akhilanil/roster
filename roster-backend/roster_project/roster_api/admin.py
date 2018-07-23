from django.contrib import admin

from roster_api.models import user_roster_model, user_roster_deatils_model

admin.site.register(user_roster_model.UserRosterModel)
admin.site.register(user_roster_deatils_model.UserRosterDetailsModel)
