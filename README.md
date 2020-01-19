# Linked-List-API

#### Create a REST API app which exposes API endpoints , for carrying out Linked List operations.

Create a web based REST API app, which exposes following API endpoints for using the link list functionalities.

- Create: To create a link list.
- Push: add object to end of existing link list.
- Pop: remove last object of the given link list.
- Remove: Delete the provided object form the given link list, if it exisits.
- List: show the complete link list.
- Reverse: show the linklist in reverse order.(the Tail becomes new head, and Head becomes new tail)
- Delete: Destroy the given link list completely.
Do appropriate error handling. Choose Any language to build the REST API app

The app APIs can be used as follows:

CREATE API : POST /api/link

	REQUEST body JSON 
	{
		name: 'John',
		birthyear: 1981
	}
	
	RESPONSE 
	{
		meta: {
			id: 101,
			length: 1
		},
		object: [{
			id: 1,
			name: 'John',
			birthyear: 1981,
			next: null
		}]
	}

GET /api/link/101

	RESPONSE 
	{
		meta: {
			id: 101,
			length: 1
		},
		object: [{
			id: 1,
			name: 'John',
			birthyear: 1981,
			next: null
		}]
	}
  
PUSH API : PUT /api/link/101

	REQUEST body JSON 
	{
		name: 'Doe',
		birthyear: 1982
	}
	
	RESPONSE 
	{
		meta: {
			id: 101,
			length: 2
		},
		object: [{
			id: 1,
			name: 'John',
			birthyear: 1981,
			next: 2
		}, {
			id: 2,
			name: 'Doe',
			birthyear: 1982,
			next: null
		}]
	}
  
PUSH API : PUT /api/link/101

	REQUEST body JSON 
	{
		name: 'Lorem',
		birthyear: 1912
	}
	
	RESPONSE 
	{
		meta: {
			id: 101,
			length: 3
		},
		object: [{
			id: 1,
			name: 'John',
			birthyear: 1981,
			next: 2
		}, {
			id: 2,
			name: 'Doe',
			birthyear: 1982,
			next: 3
		}, {
			id: 3,
			name: 'Lorem',
			birthyear: 1912,
			next: null
		}]
	}
  
POP API : GET /api/link/pop/101

	RESPONSE 
	{
		name: 'Lorem',
		birthyear: 1912,
	}
	
LIST API : GET /api/link/101

	RESPONSE 
	{
		meta: {
			id: 101,
			length: 2
		},
		object: [{
			id: 1,
			name: 'John',
			birthyear: 1981,
			next: 2
		}, {
			id: 2,
			name: 'Doe',
			birthyear: 1982,
			next: null
		}]
	}
  
REMOVE API : POST /api/link/remove/101

	REQUEST body JSON 
	{
		name: 'John',
		birthyear: 1981
	}
	
	RESPONSE 
	{
		meta: {
			id: 101,
			length: 1
		},
		object: [{
			id: 2,
			name: 'Doe',
			birthyear: 1982,
			next: null
		}]
	}
  
PUSH API : PUT /api/link/101

	REQUEST body JSON 
	{
		name: 'Ipsum',
		birthyear: 1882
	}
	
	RESPONSE 
	{
		meta: {
			id: 101,
			length: 2
		},
		object: [{
			id: 2,
			name: 'Doe',
			birthyear: 1982,
			next: 3
		}, {
			id: 3,
			name: 'Ipsum',
			birthyear: 1882,
			next: null
		}]
	}
  
PUSH API : PUT /api/link/101

	REQUEST body JSON 
	{
		name: 'Suma',
		birthyear: 1921
	}
	
	RESPONSE 
	{
		meta: {
			id: 101,
			length: 3
		},
		object: [{
			id: 2,
			name: 'Doe',
			birthyear: 1982,
			next: 3
		}, {
			id: 3,
			name: 'Ipsum',
			birthyear: 1882,
			next: 4
		}, {
			id: 4,
			name: 'Suma',
			birthyear: 1921,
			next: null
		}]
	}
  
REMOVE API : POST /api/link/remove/101

	REQUEST body JSON 
	{
		name: 'Ipsum',
		birthyear: 1882
	}
	
	RESPONSE 
	{
		meta: {
			id: 101,
			length: 3
		},
		object: [{
			id: 2,
			name: 'Doe',
			birthyear: 1982,
			next: 4
		}, {
			id: 4,
			name: 'Suma',
			birthyear: 1921,
			next: null
		}]
	}
  
LIST API : GET /api/link/101

	RESPONSE 
	{
		meta: {
			id: 101,
			length: 3
		},
		object: [{
			id: 2,
			name: 'Doe',
			birthyear: 1982,
			next: 4
		}, {
			id: 4,
			name: 'Suma',
			birthyear: 1921,
			next: null
		}]
	}
  
REVERSE API : GET /api/link/reverse/101

	RESPONSE 
	{
		meta: {
			id: 101,
			length: 3
		},
		object: [{
			id: 2,
			name: 'Doe',
			birthyear: 1982,
			next: null
		}, {
			id: 4,
			name: 'Suma',
			birthyear: 1921,
			next: 2
		}]
	}
  
DELETE API : DELETE /api/link/101

	RESPONSE status code 204, with empty response object.
