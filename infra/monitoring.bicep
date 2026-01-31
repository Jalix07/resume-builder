param location string = 'eastus'
param projectName string
param environment string = 'prod'

// Application Insights for monitoring
resource applicationInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: '${projectName}-${environment}-ai'
  location: location
  kind: 'web'
  properties: {
    Application_Type: 'web'
    RetentionInDays: 30
    publicNetworkAccessForIngestion: 'Enabled'
    publicNetworkAccessForQuery: 'Enabled'
  }
}

// Alert for high error rate
resource errorRateAlert 'Microsoft.Insights/metricAlerts@2018-03-01' = {
  name: '${projectName}-error-rate-alert'
  location: location
  properties: {
    description: 'Alert when error rate is high'
    severity: 2
    enabled: true
    scopes: [
      applicationInsights.id
    ]
    evaluationFrequency: 'PT5M'
    windowSize: 'PT15M'
    criteria: {
      'odata.type': 'Microsoft.Azure.Monitor.MultipleResourceMultipleMetricCriteria'
      allOf: [
        {
          name: 'Percentage of failed requests'
          metricName: 'failedRequests'
          operator: 'GreaterThan'
          threshold: 5
          timeAggregation: 'Total'
          dimensions: []
        }
      ]
    }
    actions: []
  }
}

// Outputs
output instrumentationKey string = applicationInsights.properties.InstrumentationKey
output applicationInsightsId string = applicationInsights.id
