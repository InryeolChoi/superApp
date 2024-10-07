#!/bin/sh

# 마이그레이션 체크 후 필요 시 마이그레이션 수행
echo "필요 시 마이그레이션 수행"
python manage.py migrate --check || python manage.py migrate

# 슈퍼유저가 있는지 확인하고 없으면 .env에서 설정한 정보로 슈퍼유저 생성
echo "슈퍼유저 확인 및 생성"
python manage.py shell -c "
from django.contrib.auth import get_user_model;
User = get_user_model();
if not User.objects.filter(is_superuser=True).exists():
    User.objects.create_superuser('${SUPERUSER_NAME}', '${SUPERUSER_EMAIL}', '${SUPERUSER_PASSWORD}')
"
# Django 개발 서버 실행
echo "장고 서버 시작..."
exec python manage.py runserver 0.0.0.0:8000