<img src="https://github.com/dmioto/zoo/blob/7ba1ff4c73cd0baee50236bf4b0daa490128eda7/Classe%20UML.png" alt="Class Diagram" width="500"/>

# How to use it

```bash
git clone https://github.com/ddmioto/zoo/
cd zoo
make
cd front/zoo-app/
npm start
```


# Zoo API Documentation

## Base URL
https://localhost:8080/api

## Endpoints

POST /auth/signup<br>
POST /auth/signin<br>
POST /zoo/add<br>
GET  /zoo/all<br>
GET  /animal/{name}<br>
GET  /animals/all?page=0&size=10&sortBy=name&direction=ASC<br>
POST /animals/add<br>



### POST /auth/signup

#### Description
Creates a new user in the system.

#### Request Body
```json
{
	"username": "jordane",
	"email": "jordan@gmail.com",
	"password": "1234abcd",
	"role": ["user"]
}
```

### Example Response
```json
{
	"message": "User registered successfully!"
}
```

### Example Request

```bash
curl --request POST \
  --url http://localhost:8080/api/auth/signup \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/9.2.0' \
  --data '{
	"username": "jordane",
	"email": "jordan@gmail.com",
	"password": "1234abcd",
	"role": ["user"]
}'
```
---

### POST /auth/signin

#### Description
Logs user into the platform and returns a token.

#### Request Body
```json
{
	"username": "jordane",
	"password": "1234abcd"
}
```

### Example Response
```json
{
	"id": 1,
	"username": "jordane",
	"email": "jordan@gmail.com",
	"roles": [
		"ROLE_USER"
	],
	"accessToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkZG1pb3RvIiwiaWF0IjoxNzE4Njg3MTA5LCJleHAiOjE3MTg3NzM1MDl9.QfixSlgt_K4NKlD_DLAMsD7A26NtrCq--E4KFtwUL0s",
	"tokenType": "Bearer"
}
```

### Example Request

```bash
curl --request POST \
  --url http://localhost:8080/api/auth/signin \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/9.2.0' \
  --data '{
	"username": "jordane",
	"password": "1234abcd"
}'
```

---

### POST /zoo/add

#### Description
Add zoo with animals on system

#### Request Body
```json
[
	{
		"name": "Zoologico de São Paulo",
		"cnpj": "1111111111",
		"address": {
			"street": "rua tal",
			"number": 15,
			"cep": "13566-210",
			"city": "São Paulo"
		},
		"animals": [
			{
				"name": "Trash Lion Tamarin",
				"taxonomy": {
					"kingdom": "Animalia",
					"phylum": "Chordata",
					"class": "Mammalia",
					"order": "Primates",
					"family": "Callitrichidae",
					"genus": "Leontopithecus",
					"scientific_name": "Leontopithecus rosalia"
				},
				"locations": [
					"South-America"
				],
				"characteristics": {
					"main_prey": "Fruit, Insects, Small Mammals, Small Reptiles",
					"habitat": "Lowland tropical forest",
					"predators": "Hawks, Wild Cats, Snakes, Rats",
					"diet": "Omnivore",
					"average_litter_size": "2",
					"lifestyle": "Troop",
					"favorite_food": "Fruit",
					"type": "Mammal",
					"slogan": "Native to the eastern rainforests of Brazil!",
					"color": "BrownBlackGoldOrange",
					"skin_type": "Hair",
					"top_speed": "24 mph",
					"lifespan": "8-15 years",
					"weight": "550-700g (19-25oz)"
				}
			}
		]
	}
]
```

### Example Response
```json
201 Created
```

### Example Request

```bash
curl --request POST \
  --url http://localhost:8080/api/zoo/add \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkZG1pb3RvIiwiaWF0IjoxNzE4NzI4NDExLCJleHAiOjE3MTg4MTQ4MTF9.VtQ_sDpYuTbYaK3rNe4EfHbH-Cv6zuPyPrJ5UJx3Y4U' \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/9.2.0' \
  --data '...'
```

---

### GET /zoo/all

#### Description
Get all Zoos

#### Request Body
```json
none
```

### Example Response
```json
[
	{
		"id": 9,
		"name": "Zoo 1",
		"cnpj": "12345678901234",
		"address": {
			"id": 9,
			"street": "Rua A",
			"number": 100,
			"cep": "12345-678",
			"city": "Cidade A"
		},
		"animals": [
			{
				"id": 41,
				"name": "Bowhead Whale",
				"taxonomy": {
					"id": 41,
					"kingdom": "Animalia",
					"phylum": "Chordata",
					"classe": null,
					"order": "Artiodactyla",
					"family": "Balaenidae",
					"genus": "Balaena",
					"scientificName": null
				},
				"locations": [
					"Least Concern"
				],
				"characteristics": {
					"id": 41,
					"prey": "Zooplankton",
					"nameOfYoung": null,
					"groupBehavior": null,
					"biggestThreat": null,
					"mostDistinctiveFeature": null,
					"gestationPeriod": null,
					"litterSize": null,
					"habitat": null,
					"diet": "Herbivore",
					"type": null,
					"commonName": null,
					"origin": null,
					"numberOfSpecies": null,
					"location": "Arctic and subarctic waters",
					"color": null,
					"skinType": null,
					"topSpeed": null,
					"lifespan": "Unknown, but may be 200 years or more",
					"weight": "75 to 100 ton",
					"height": null,
					"length": "50 to 60 feet long",
					"ageOfSexualMaturity": null,
					"ageOfWeaning": null
				}
			}
    ]
  }
]
```

### Example Request

```bash
curl --request GET \
  --url http://localhost:8080/api/zoo/all \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkZG1pb3RvIiwiaWF0IjoxNzE4NzI4NDExLCJleHAiOjE3MTg4MTQ4MTF9.VtQ_sDpYuTbYaK3rNe4EfHbH-Cv6zuPyPrJ5UJx3Y4U' \
  --header 'User-Agent: insomnia/9.2.0'
```


---

### GET /animal/{name}

#### Description
Get animal by name

#### Request Body
```json
none
```

### Example Response
```json
{
	"id": 1,
	"name": "Cape Lion",
	"taxonomy": {
		"id": 1,
		"kingdom": "Animalia",
		"phylum": "Chordata",
		"classe": null,
		"order": "Carnivora",
		"family": "Felidae",
		"genus": "Panthera",
		"scientificName": null
	},
	"locations": [
		"Africa"
	],
	"characteristics": {
		"id": 1,
		"prey": "Wildebeests, antelopes, zebras, buffalos, rodents, and more",
		"nameOfYoung": null,
		"groupBehavior": null,
		"biggestThreat": null,
		"mostDistinctiveFeature": null,
		"gestationPeriod": null,
		"litterSize": null,
		"habitat": "plains",
		"diet": "Carnivore",
		"type": "mammal",
		"commonName": null,
		"origin": "South Africa",
		"numberOfSpecies": null,
		"location": "South Africa",
		"color": "BrownYellowWhiteOrange",
		"skinType": null,
		"topSpeed": null,
		"lifespan": "25 years",
		"weight": "up to 600 pounds",
		"height": "4 feet",
		"length": "6-7 feet",
		"ageOfSexualMaturity": null,
		"ageOfWeaning": null
	}
}
```

### Example Request

```bash
curl --request GET \
  --url http://localhost:8080/api/animals/Cape%20Lion \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkZG1pb3RvIiwiaWF0IjoxNzE4NzI4NDExLCJleHAiOjE3MTg4MTQ4MTF9.VtQ_sDpYuTbYaK3rNe4EfHbH-Cv6zuPyPrJ5UJx3Y4U' \
  --header 'User-Agent: insomnia/9.2.0'
```

---

### GET /animals/{name}

#### Description
Get animal by name

#### Request Body
```json
none
```

### Example Response
```json
{
	"id": 1,
	"name": "Cape Lion",
	"taxonomy": {
		"id": 1,
		"kingdom": "Animalia",
		"phylum": "Chordata",
		"classe": null,
		"order": "Carnivora",
		"family": "Felidae",
		"genus": "Panthera",
		"scientificName": null
	},
	"locations": [
		"Africa"
	],
	"characteristics": {
		"id": 1,
		"prey": "Wildebeests, antelopes, zebras, buffalos, rodents, and more",
		"nameOfYoung": null,
		"groupBehavior": null,
		"biggestThreat": null,
		"mostDistinctiveFeature": null,
		"gestationPeriod": null,
		"litterSize": null,
		"habitat": "plains",
		"diet": "Carnivore",
		"type": "mammal",
		"commonName": null,
		"origin": "South Africa",
		"numberOfSpecies": null,
		"location": "South Africa",
		"color": "BrownYellowWhiteOrange",
		"skinType": null,
		"topSpeed": null,
		"lifespan": "25 years",
		"weight": "up to 600 pounds",
		"height": "4 feet",
		"length": "6-7 feet",
		"ageOfSexualMaturity": null,
		"ageOfWeaning": null
	}
}
```

### Example Request

```bash
curl --request GET \
  --url http://localhost:8080/api/animals/Cape%20Lion \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkZG1pb3RvIiwiaWF0IjoxNzE4NzI4NDExLCJleHAiOjE3MTg4MTQ4MTF9.VtQ_sDpYuTbYaK3rNe4EfHbH-Cv6zuPyPrJ5UJx3Y4U' \
  --header 'User-Agent: insomnia/9.2.0'
```

---

### GET /animals/all?page=0&size=10&sortBy=name&direction=ASC

#### Description
Get all animals with pagination

#### Request Body
```json
none
```

### Example Response
```json
{
	"content": [
		{
			"id": 66,
			"name": "Aardwolf",
			"taxonomy": {
				"id": 66,
				"kingdom": "Animalia",
				"phylum": "Chordata",
				"classe": null,
				"order": "Carnivora",
				"family": "Hyaenidae",
				"genus": "Proteles",
				"scientificName": null
			},
			"locations": [
				"Africa"
			],
			"characteristics": {
				"id": 66,
				"prey": "Termites and other insects",
				"nameOfYoung": null,
				"groupBehavior": null,
				"biggestThreat": null,
				"mostDistinctiveFeature": null,
				"gestationPeriod": null,
				"litterSize": null,
				"habitat": "Savannas and grasslands",
				"diet": "Carnivore",
				"type": "mammal",
				"commonName": null,
				"origin": null,
				"numberOfSpecies": null,
				"location": "Sub-Saharan Africa",
				"color": "BrownYellowBlack",
				"skinType": null,
				"topSpeed": null,
				"lifespan": "15 years",
				"weight": "17-31lbs",
				"height": "16-20in",
				"length": "33-41in",
				"ageOfSexualMaturity": null,
				"ageOfWeaning": null
			}
		}
  ]
}
```

### Example Request

```bash
curl --request GET \
  --url 'http://localhost:8080/api/animals/all?page=0&size=10&sortBy=name&direction=ASC' \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkZG1pb3RvIiwiaWF0IjoxNzE4NzI4NDExLCJleHAiOjE3MTg4MTQ4MTF9.VtQ_sDpYuTbYaK3rNe4EfHbH-Cv6zuPyPrJ5UJx3Y4U' \
  --header 'User-Agent: insomnia/9.2.0'
```

---

### POST /animals/add

#### Description
Add a list of animals

#### Request Body
```json
[
	{
		"name": "Golden Lion Tamarin",
		"taxonomy": {
			"kingdom": "Animalia",
			"phylum": "Chordata",
			"class": "Mammalia",
			"order": "Primates",
			"family": "Callitrichidae",
			"genus": "Leontopithecus",
			"scientific_name": "Leontopithecus rosalia"
		},
		"locations": [
			"South-America"
		],
		"characteristics": {
			"main_prey": "Fruit, Insects, Small Mammals, Small Reptiles",
			"habitat": "Lowland tropical forest",
			"predators": "Hawks, Wild Cats, Snakes, Rats",
			"diet": "Omnivore",
			"average_litter_size": "2",
			"lifestyle": "Troop",
			"favorite_food": "Fruit",
			"type": "Mammal",
			"slogan": "Native to the eastern rainforests of Brazil!",
			"color": "BrownBlackGoldOrange",
			"skin_type": "Hair",
			"top_speed": "24 mph",
			"lifespan": "8-15 years",
			"weight": "550-700g (19-25oz)"
		}
	}
]
```

### Example Response
```json
201 Created
```

### Example Request

```bash
curl --request POST \
  --url 'http://localhost:8080/api/animals/add' \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkZG1pb3RvIiwiaWF0IjoxNzE4NzI4NDExLCJleHAiOjE3MTg4MTQ4MTF9.VtQ_sDpYuTbYaK3rNe4EfHbH-Cv6zuPyPrJ5UJx3Y4U' \
  --header 'User-Agent: insomnia/9.2.0'
  --data '...'
```

