from app import create_app

app = create_app()

if __name__ == '__main__':
    print(app.url_map)
    app.config.from_object('settings')
    app.run()