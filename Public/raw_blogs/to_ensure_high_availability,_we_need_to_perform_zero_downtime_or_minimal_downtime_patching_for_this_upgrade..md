---
author: Anurag Ranjan
headerImage: https://picsum.photos/629
id: to_ensure_high_availability,_we_need_to_perform_zero_downtime_or_minimal_downtime_patching_for_this_upgrade.
time: 17 01 2025
title: To ensure high availability, we need to perform zero downtime or minimal downtime
  patching for this upgrade.
---

To ensure high availability, we need to perform zero downtime or minimal downtime patching for this upgrade.

Zero Downtime Patching (ZDP) is available for all supported Aurora MySQL versions and DB instance classes.

Limitations:
Global variables. Aurora restores session variables, but it doesn't restore global variables after the restart.

In-memory auto_increment state for tables. The in-memory auto-increment state is reinitialized.

The code which uses these Database connections should have retry mechanism to handle potential connection failures and prevent exceptions.

During periods of downtime or unavailability (typically lasting between 30 seconds to 1 minute), the database should not be queried.

 

Pre-Upgrade Steps:
Best Practice :

The upgrade should be performed during a period of low traffic.

There should not be any long-running queries or transactions that could impact the upgrade process.

Verify that there are no temporary tables, user locks, or table locks (DDL statements), as Aurora will drop these connections.

Use AWS SDKs that support exponential backoff and jitter as a best practice.

Prechecks : 

Ensure that the target Aurora MySQL version 3.07 is compatible with the current version 3.05/3.04.

Verify that there are no pending parameter changes that could prevent ZDP from completing successfully.

Create a snapshot of the database before the upgrade to ensure that a backup is available in case of any issues during the upgrade process.

Upgrade Steps:
Initiate the upgrade: Start the upgrade process for the minor version using AWS CLI or by Updating the Cloudformation Stack.

Pre-checks by AWS: AWS will run a pre-check for the upgrade. If it fails, the upgrade will be cancelled.

Monitor the upgrade: Observe the upgrade process on the Events page in the AWS Management Console to track progress and any issues that may arise.

Verify ZDP completion: Check the MySQL error log and the Events page to confirm that ZDP has completed successfully and that connections have been preserved.

Post-Upgrade Steps:
Verify database status : Check the database status to ensure that it is online and available for use.

Test the database connections: Check if the database connections are preserved.

Review the database logs: Check MySQL error logs for any errors related to the database upgrade.

Reinitialize the Global variables: Reinitialize all global variables that were lost during the restart.

Rollback Plan:
In case of any issues during the upgrade, use the snapshot created earlier to restore the database.