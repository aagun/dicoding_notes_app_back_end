#Konfigurasi Database

```bash
  docker run -it --rm \
    --name dicoding_notes_db \
    -e POSTGRES_DB=notes \
    -e POSTGRES_USER=dicoding \
    -e POSTGRES_PASSWORD=vBYFPMcHDFJUVsxFYXsL56wR \
    -e PGDATA=/var/lib/postgresql/data/pgdata \
    -p 5432:5432 \
    -v "$pwd/notes-data/:/var/lib/postgresql/data" \
    postgres:15
```
