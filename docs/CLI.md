# CLI

run the CLI container

## help

```shell
docker-compose run -it hungree-cli --help
```

## list

```shell
docker-compose run -it hungree-cli list
```

## search

| parameter | description | default |
| :-------: | :---------: | :-----: |
| distance  |    minimum distance in Km between you and food     |   100      |
|  vendor   |    vendor name     |      `null`   |
| category  |    food category     |   `null`      |

- distance (--distance)
- vendor (--vendor)
- category (--category)

```shell
docker-compose run -it hungree-cli search --category fruit

# if you are oin Alaska, or NYC looking for San Franciso trucks!!!
docker-compose run -it hungree-cli search -c fruit -d 100000
```
