We now should have a backend responding to requests for NS, SOA, ANY as well as MX records for all domains managed by us.

Based on this we want to add the functionality to configure SPF TXT records for domains.

 * The interviewe should have prepared on the topic of SPF records and should give a quick overview
 * The interviewer should expand on this overview, so the interviewe knows all information relevant to the task

It is important for this task that SPF records can contain configurations for multiple sending parties. It would be good, if the user of the API does not need to understand how SPF records function, but can still use the API to configure the domain to contain SPF entries for multiple email providers.

 * The interviewe should explain how he thinks the service could best be extended to support setting, updating and deleting a custom SPF TXT record for domains and to retrieve the record via the existing lookup function. The interviewe should also mention if he sees any potential problems or sensible alternate solutions.
 * The interviewer and interviewe should agree on a solution
 * The interviewe should implement the solution with help and guidance of the interviewer