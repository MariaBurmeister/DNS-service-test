export const isManagedByUs = (domain: string) => {
  return domain === "example.com";
};

export type QType = "A" | "NS" | "CNAME" | "SOA";

type ResponseType = "ANY" | "NS1" | "NS2" | "SOA";

interface Response<T> {
  qName: string;
  qType: T;
  content: string;
  ttl: 3600;
}

export const getQTypeResponse = (qName: string, qType: QType) => {
  const responseMap: Record<ResponseType, Response<QType>> = {
    SOA: {
      qName,
      qType: "SOA",
      content:
        "ns1.jimdo.com. hostmaster.jimdo.com. 2018041355 10800 3600 604800 600",
      ttl: 3600,
    },
    NS1: {
      qName,
      qType: "NS",
      content: "ns1.jimdo.com",
      ttl: 3600,
    },
    NS2: {
      qName,
      qType: "NS",
      content: "ns2.jimdo.com",
      ttl: 3600,
    },
    ANY: {
      qName,
      qType,
      ttl: 3600,
      content: "1.2.3.4",
    },
  };

  switch (qType) {
    case "SOA":
      return [responseMap.SOA];
    case "NS":
      return [responseMap.NS1, responseMap.NS2];
    case "A":
      return [
        responseMap.SOA,
        responseMap.NS1,
        responseMap.NS2,
        responseMap.ANY,
      ];
    case "CNAME":
      return [
        responseMap.SOA,
        responseMap.NS1,
        responseMap.NS2,
        responseMap.ANY,
      ];
    default:
      throw new Error(
        "Bad Request, a qType (A | NS | CNAME | SOA) parameter is required"
      );
  }
};
