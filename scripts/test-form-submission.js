const { submitFamilyCaregiverApplication, submitCareApplication, submitJobApplication } = require('../app/actions/database-forms');

async function testFormSubmissions() {
  try {
    console.log('🧪 Testing form submissions to database...');
    
    // Test Family Caregiver Application
    console.log('\n📝 Testing Family Caregiver Application...');
    const familyResult = await submitFamilyCaregiverApplication({
      firstName: "John",
      lastName: "Doe",
      phone: "123-456-7890",
      email: "john.doe@test.com",
      postalCode: "12345",
      state: "Massachusetts",
      lookingFor: "Care for a Family/Friend",
      relationship: "Parent",
      liveWith: "Yes",
      dailyHelp: "Yes",
      guardian: "No",
      medicaid: "Yes",
      language: "English",
      smsConsent: true
    });
    
    console.log('Family Caregiver Result:', familyResult);
    
    // Test Care Application
    console.log('\n🏥 Testing Care Application...');
    const careResult = await submitCareApplication({
      firstName: "Jane",
      lastName: "Smith",
      phone: "987-654-3210",
      email: "jane.smith@test.com",
      postalCode: "54321",
      serviceType: "in_home_care",
      whoNeedsCare: "parent_loved_one"
    });
    
    console.log('Care Application Result:', careResult);
    
    // Test Job Application
    console.log('\n💼 Testing Job Application...');
    const jobResult = await submitJobApplication({
      firstName: "Bob",
      lastName: "Johnson",
      phone: "555-123-4567",
      email: "bob.johnson@test.com",
      postalCode: "67890",
      gender: "Male",
      experience: "Yes",
      careTypes: ["In-Home Care", "Companionship"]
    });
    
    console.log('Job Application Result:', jobResult);
    
    console.log('\n✅ All form submission tests completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Full error:', error);
  }
}

testFormSubmissions();

