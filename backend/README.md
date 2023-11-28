# How to run Azure Function locally

Follow the instructions
[here](https://learn.microsoft.com/en-us/azure/azure-functions/create-first-function-cli-python?tabs=linux%2Cbash%2Cazure-cli&pivots=python-mode-decorators#install-the-azure-functions-core-tools)
to install all the necessary things to run the function locally. Then you
will have to follow
[this](https://learn.microsoft.com/en-us/azure/azure-functions/create-first-function-cli-python?tabs=linux%2Cbash%2Cazure-cli&pivots=python-mode-decorators#start-the-storage-emulator)
steps to run the Function.

You can use Postman to test the endpoint, currently it recieves the following
as body

```json
{
    "op": "<operation to do>",
    "blobNames" : "[array of blobNames]"
}
```
