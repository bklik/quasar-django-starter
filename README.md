# Quasar/Django Starter with Session Authentication

## Install the dependencies

```bash
python -m venv .venv
source .venv/bin/activate

pip install django
pip install djangorestframework
pip install django-cors-headers
```

### Initialize the backend

```bash
cd backend/
python manage.py migrate
python manage.py createsuperuser
```

### Develop With Project

```bash
# Terminal 1
python manage.py runserver
```

```bash
# Terminal 2
quasar dev
```
