import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as secretmanager from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

interface DbStackProps extends cdk.StackProps {
  vpc: ec2.Vpc;
}

export class DbStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: DbStackProps) {
    super(scope, id, props);

    const dbSecret = new secretmanager.Secret(this, 'dbSecret', {
      generateSecretString: {
        secretStringTemplate: JSON.stringify({ username: 'postgres' }),
        generateStringKey: 'password',
        excludeCharacters: '"@/\\',
      },
    });
    //const username = dbSecret.secretValueFromJson('username').toString();
    //const password = dbSecret.secretValueFromJson('password').toString();
    const username = 'postgres';
    const password = 'yourpassword';

    const userData = ec2.UserData.forLinux({
      shebang: '#!/bin/bash -xe',
    });
    userData.addCommands(
      'sudo yum install -y postgresql15-server',
      'sudo postgresql-setup initdb',
      'sudo su - root',
      'cd /var/lib/pgsql/data',
      "sudo sed -i -e \"s/^#listen_addresses = 'localhost'/listen_addresses = '*'/g\" ./postgresql.conf",
      'sudo echo "host all all 0.0.0.0/0 md5" >> ./pg_hba.conf',
      'sudo service postgresql start',
      'sleep 10',
      `sudo -u postgres psql -c "ALTER USER ${username} WITH PASSWORD '${password}';"`
    );

    const securityGroup = new ec2.SecurityGroup(this, 'DbSecurityGroup', {
      vpc: props.vpc,
      allowAllOutbound: true,
    });
    securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(5432),
      'Allow inbound traffic to PostgreSQL'
    );

    const ec2SsmManagedRole = new iam.Role(this, 'EC2SSMManagedRole', {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AmazonEC2RoleforSSM'),
      ],
    });

    const dbInstance = new ec2.Instance(this, 'DbInstance', {
      vpc: props.vpc,
      instanceType: new ec2.InstanceType('t2.micro'),
      machineImage: ec2.MachineImage.latestAmazonLinux2023(),
      vpcSubnets: props.vpc.selectSubnets({
        subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
      }),
      role: ec2SsmManagedRole,
      userData: userData,
      securityGroup: securityGroup,
    });
    dbInstance.userData.addSignalOnExitCommand(dbInstance);

    new cdk.CfnOutput(this, 'DbInstancePrivateIp', {
      value: dbInstance.instancePrivateIp,
    });
  }
}
