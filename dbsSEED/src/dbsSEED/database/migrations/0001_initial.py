# Generated by Django 3.0.2 on 2020-01-07 03:28

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='UserData',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('account_id', models.IntegerField()),
                ('transaction_id', models.IntegerField()),
                ('transaction_amount', models.DecimalField(decimal_places=2, max_digits=10)),
            ],
        ),
    ]