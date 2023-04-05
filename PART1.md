# Basic Functionality

We are building a backend for a DNS server. The DNS server will forward requests to the backend (via path parameters) and expect the backend to answer with the records formatted as json.

## Example

**Request:**

```
"/lookup/:qname/:qtype"
/lookup/example.com./NS
```

**Response containing records:**

```json
{
  "result": [
    {
      "qname": "<the qname>",
      "qtype": "NS",
      "content": "ns1.jimdo.com",
      "ttl": 3600
    },
    {
      "qname": "<the qname>",
      "qtype": "NS",
      "content": "ns2.jimdo.com",
      "ttl": 3600
    }
  ]
}
```

**Response without records:**

```json
{
  "result": false
}
```

## Integration

We want the DNS server to deliver records for all domains belonging to websites in our database. For the start we want to respond to NS, A, CNAME and SOA requests coming in to the DNS server. The DNS server will forward A and CNAME requests as ANY requests to the backend, for which the response is expected to always contain all records for the domain.

The responses to the queries should be as follows:

- we want to respond with `{"result": false}`, if the query is invalid or the domain does not belong to one of our websites.
- we want to respond with a fixed response to SOA queries

```json
{
  "result": [
    {
      "qname": "<the qname>",
      "qtype": "SOA",
      "content": "ns1.jimdo.com. hostmaster.jimdo.com. 2018041355 10800 3600 604800 600",
      "ttl": 3600
    }
  ]
}
```

- we want to respond with a fixed response to NS queries

```json
{
  "result": [
    {
      "qname": "<the qname>",
      "qtype": "NS",
      "content": "ns1.jimdo.com",
      "ttl": 3600
    },
    {
      "qname": "<the qname>",
      "qtype": "NS",
      "content": "ns2.jimdo.com",
      "ttl": 3600
    }
  ]
}
```

- we want to respond with a fixed response to ANY queries, containing all the responses above plus

```json
{
  "result": [
    {...},
    {...},
    {...},
    {
      "qname": "<the qname>",
      "qtype": "A",
      "content": "1.2.3.4",
      "ttl": 3600
    }
  ]
}
```
