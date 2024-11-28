# Базовый образ
FROM python:3.11-slim

# Установить зависимости системы
RUN apt-get update && apt-get install -y \
    libpq-dev gcc libssl-dev python3-dev --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Установить pip
RUN pip install --upgrade pip

# Копируем только requirements.txt для установки зависимостей
COPY sportline_project/requirements.txt /app/

# Установить зависимости из requirements.txt
RUN pip install -r /app/requirements.txt


# Копируем весь проект в контейнер
COPY . /app/

# Устанавливаем рабочую директорию
WORKDIR /app/sportline_project/

# Команда по умолчанию для запуска Django
CMD ["sh", "-c", "python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
