export const myStructure = (S) =>
  S.list()
    .title('Content')
    .items([
      // Regular document types
      S.documentTypeListItem('post').title('Information Centre Articles'),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('author').title('Authors'),
      
      S.divider(),
      
      // Standard Pages
      S.documentTypeListItem('page').title('Standard Pages'),

      S.divider(),

      // Custom Singleton Pages
      S.listItem()
        .title('Site Settings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      S.listItem()
        .title('Home Page')
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homeSingleton')
        ),
      S.listItem()
        .title('Information Centre Page')
        .child(
          S.document()
            .schemaType('informationCentrePage')
            .documentId('informationCentreSingleton')
        ),
      S.listItem()
        .title('Easy Wins Page')
        .child(
          S.document()
            .schemaType('easyWinsPage')
            .documentId('easyWinsSingleton')
        ),
      S.listItem()
        .title('Simple Strategy Page')
        .child(
          S.document()
            .schemaType('simpleStrategyPage')
            .documentId('simpleStrategySingleton')
        ),
      S.listItem()
        .title('Investment Philosophy Page')
        .child(
          S.document()
            .schemaType('philosophyPage')
            .documentId('philosophySingleton')
        ),
      S.listItem()
        .title('Case Studies Page')
        .child(
          S.document()
            .schemaType('caseStudiesPage')
            .documentId('caseStudiesSingleton')
        ),
      S.listItem()
        .title('Steps to Success Page')
        .child(
          S.document()
            .schemaType('stepsToSuccessPage')
            .documentId('stepsToSuccessSingleton')
        ),
    ])
