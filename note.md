# Setup

1. Installare node e npm. Docker e Docker-compose

2. creare un utente non sudoer "aral"

3. loggarsi come "aral"
>   - `su aral`

4. configurare utente "aral" per accettare connessioni ssh con chiave pubblica: 
>   - `[aggiungerlo nel file /etc/ssh/sshd_config]`
>   - `ssh-keygen -t rsa -N "" -f ~/.ssh/id_rsa`

5. installa aral-vps-test: 
>   - `mkdir ~/.npm-global`
>   - `npm config set prefix '~/.npm-global'`
>   - `nano ~/.profile`
>   - dentro profile aggiungere `export PATH=~/.npm-global/bin:$PATH`
>   - `source ~/.profile`
>   - `npm i -g aral-vps-test`


1. inizializza aral: 
>   - `aral init`

7. Configurare i permessi del file dei certificati di Traefik (devi essere un sudoer): 
>   - `su [utente_sudoer]`
>   - `sudo chmod 600 acme.json && chown root acme.json`

8. Avvia aral (devi essere utente "aral")
>   - `su aral`
>   - `aral start`

9. Configurare accesso di "webhook" verso "docker host"
>   - `docker exec -ti webhook sh`
>   - `ssh-copy-id -p 2552 aral@$(ip route show default | awk '/default/ {print $3}')`

# Utilizzo di aral dal container "webhook"
> `ssh -p 2552 aral@$(ip route show default | awk '/default/ {print $3}') aral`
