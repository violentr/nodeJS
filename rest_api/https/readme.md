### Generate new certificate

```bash
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
```
Country name: US
State: California
City: San Frncisco
Org name: Local Studio
Unit name: Local Studio
Common name: localhost
email: local@email.local
