from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import SlidingToken
from app.models import User, Post, Comment, Token, Follower
from django.db.models import Q
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from django.conf import settings
# Serializer for the User model


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "profession",
            "phone_number",
            "last_location",
            "is_google_user",
            "is_verified",
            "is_linkedin_user",
            "is_facebook_user",
            "is_active",
            "is_staff",
            "bio",
            "cover",
            "profile_pic",
            "created_at",
            "updated_at",
        )  # Serialize all fields of the User model
        read_only_fields = ("id", "is_superuser", "date_joined")


class UserCreateSerializer(serializers.ModelSerializer):
    cover = serializers.ImageField(
        max_length=255,
        allow_empty_file=True,
        allow_null=True,
        required=False,
    )
    profile_pic = serializers.ImageField(
        max_length=255,
        allow_empty_file=True,
        allow_null=True,
        required=False,
    )

    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "password",
            "username",
            "profession",
            "phone_number",
            "bio",
            "cover",
            "profile_pic",
        )
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

    def to_representation(self, instance):
        return UserSerializer(instance, context=self.context).data


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)

    def validate(self, attrs):
        username = attrs.get("username")
        password = attrs.get("password")
        self.user = authenticate(username=username, password=password)
        if not self.user:
            raise serializers.ValidationError(_("Invalid email or password"))
        attrs["user"] = self.user
        return attrs

    def to_representation(self, instance):
        token = SlidingToken.for_user(self.user)
        return {
            "token": str(token),
            "user": UserSerializer(self.user, context=self.context).data,
        }


class UserPasswordChangeSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True, write_only=True)
    new_password = serializers.CharField(required=True, write_only=True)

    def validate_old_password(self, value):
        user = self.context.get("request").user
        if not user.check_password(value):
            raise serializers.ValidationError(_("Invalid old password"))
        return value

    def validate_new_password(self, value):
        user = self.context.get("request").user
        if user.check_password(value):
            raise serializers.ValidationError(
                _("New password must be different from old password")
            )
        return value

    def save(self, **kwargs):
        user = self.context.get("request").user
        user.set_password(self.validated_data.get("new_password"))
        user.save()
        return user

    def to_representation(self, instance):
        return {"detail": _("Password changed successfully")}


class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField(min_length=5)

    def validate_email(self, email: str):
        email = email.lower()
        user = User.objects.filter(email__iexact=email).first()
        if not user:
            raise serializers.ValidationError(_("Email does not exists"))
        self.user = user
        return email

    def get_user(self, is_active=None):
        return getattr(self, "user", None)


class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    image = serializers.ImageField(
        max_length=255,
        allow_empty_file=True,
        allow_null=True,
        required=False,
    )
    comments_count = serializers.SerializerMethodField()
    likers_count = serializers.SerializerMethodField()
    savers_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()
    is_saved = serializers.SerializerMethodField()

    def get_comments_count(self, obj):
        return obj.comments.count()

    def get_likers_count(self, obj):
        return obj.likers.count()

    def get_savers_count(self, obj):
        return obj.savers.count()

    def get_is_liked(self, obj):
        user = self.context.get("request").user
        return user in obj.likers.all()

    def get_is_saved(self, obj):
        user = self.context.get("request").user
        return user in obj.savers.all()


    class Meta:
        model = Post
        fields = (
            "id",
            "content",
            "user",
            "image",
            "category",
            "location",
            "comments_count",
            "likers_count",
            "savers_count",
            "is_liked",
            "is_saved",
        )
    
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    image = serializers.ImageField(
        max_length=255,
        allow_empty_file=True,
        allow_null=True,
        required=False,
    )
    comments_count = serializers.SerializerMethodField()
    likers_count = serializers.SerializerMethodField()
    savers_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()
    is_saved = serializers.SerializerMethodField()

    def get_comments_count(self, obj):
        return obj.comments.count()

    def get_likers_count(self, obj):
        return obj.likers.count()

    def get_savers_count(self, obj):
        return obj.savers.count()

    def get_is_liked(self, obj):
        user = self.context.get("request").user
        return user in obj.likers.all()

    def get_is_saved(self, obj):
        user = self.context.get("request").user
        return user in obj.savers.all()

    class Meta:
        model = Comment
        fields = (
            "id",
            "image",
            "post",
            "content",
            "user",
            "savers_count",
            "likers_count",
            "comments_count",
            "is_liked",
            "is_saved",
        )
    
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class SubCommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    image = serializers.ImageField(
        max_length=255,
        allow_empty_file=True,
        allow_null=True,
        required=False,
    )
    comments_count = serializers.SerializerMethodField()
    likers_count = serializers.SerializerMethodField()
    savers_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()
    is_saved = serializers.SerializerMethodField()

    def get_comments_count(self, obj):
        return obj.comments.count()

    def get_likers_count(self, obj):
        return obj.likers.count()

    def get_savers_count(self, obj):
        return obj.savers.count()

    def get_is_liked(self, obj):
        user = self.context.get("request").user
        return user in obj.likers.all()

    def get_is_saved(self, obj):
        user = self.context.get("request").user
        return user in obj.savers.all()


    class Meta:
        model = Comment
        fields = (
            "id",
            "image",
            "content",
            "user",
            "comments_count",
            "parent",
            "post",
            "savers_count",
            "likers_count",
            "is_liked",
            "is_saved",
        )
    
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class FollowerSerializer(serializers.ModelSerializer):
    followers_count = serializers.SerializerMethodField()

    class Meta:
        model = Follower
        fields = ("id", "user", "followers_count")

    def get_followers_count(self, obj):
        return obj.followers.count()



class TokenVerifySerializer(serializers.Serializer):
    token = serializers.PrimaryKeyRelatedField(
        queryset=Token.objects.all(), source="key"
    )

    def validate_token(self, token):
        if token.created < (
            timezone.now()
            - timezone.timedelta(seconds=settings.TOKEN_EXPIRY_TIME)  # noqa
        ):
            raise serializers.ValidationError(_("Token has expired"))
        self.user = token.user
        return token

    def create(self, validated_data):
        self.user.is_email_verified = True
        self.user.is_active = True
        self.user.save()
        return self.user