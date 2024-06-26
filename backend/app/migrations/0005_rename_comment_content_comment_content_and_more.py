# Generated by Django 5.0 on 2024-03-21 06:05

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_alter_comment_id_alter_customtoken_id_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='comment',
            old_name='comment_content',
            new_name='content',
        ),
        migrations.RenameField(
            model_name='comment',
            old_name='content_image',
            new_name='image',
        ),
        migrations.RemoveField(
            model_name='comment',
            name='parent_comment',
        ),
        migrations.AddField(
            model_name='comment',
            name='parent',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='parent_comment', to='app.comment'),
        ),
        migrations.AddField(
            model_name='comment',
            name='subcomments',
            field=models.ManyToManyField(blank=True, to='app.comment'),
        ),
    ]
