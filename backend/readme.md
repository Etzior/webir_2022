# Install

Python version: 3.10

- `python -m venv '.venv'`

- `source .venv/bin/activate`

- `pip install -r requirements.txt`

- `sudo service postgresql start`

- `uvicorn app:app --reload`

```
sudo -u postgres createuser webir --interactive -P
sudo -u postgres psql
CREATE DATABASE webir OWNER webir;

sudo -u postgres psql webir
create extension pg_trgm;
create extension btree_gin;

```