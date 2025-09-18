import * as aws from "@pulumi/aws";

const myBucket = new aws.s3.Bucket("myBucket");
const bucketArn = myBucket.arn;
`${bucketArn}`;
`${bucketArn}`;

const db = new aws.rds.ClusterInstance("port-test", {
  clusterIdentifier: "my-cluster",
  instanceClass: "db.t3.medium",
  engine: "aurora-mysql",
});

new aws.ssm.Parameter("db-port", {
  type: aws.ssm.ParameterType.String,
  name: "/myapp/db/port",
  value: `${db.port}`, // This should trigger a lint warning
});
