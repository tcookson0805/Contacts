$(document).ready(function(){
  
  var contactsList = []
  var contactTemp = {
    'Contact ID' : '',
    'First Name' : '',
    'Last Name' : '',
    'Phone Number' : '',
    'Email' : '',
    'Street' : '',
    'City' : '',
    'State' : '',
    'Zip' : ''
  }
  
  var contactID = 0;
  
  var clearFields = function(){
    
    $('#firstName').val('');
    $('#lastName').val('');
    $('#phoneNumber').val('');
    $('#email').val('');
    $('#street').val('');
    $('#city').val('')
    $('#state').val('');
    $('#zip').val('');
  }
  
  var updateContactsList = function(){
    
    for(var i = 0; i < contactsList.length; i++){
      console.log(contactsList[i]['First Name'])
      $('.contact-list-group').append('<div class="contact">' + contactsList[i]['First Name'] + ' ' + contactsList[i]['Last Name']  + '</div>')
      // $('.contact-list-group').append('<div class="contact">asdfasdf</div>')

    }
  }
  
  var getContact = function(number){
    for(var i = 0; i < contactsList.length; i++){
      if(contactsList[i]['Contact ID'] === number){
        console.log(contactsList[i])
        return contactsList[i];
      }
    }
  }
  
  var showContact = function(obj){
    
    
    $('.contact_current_headline').text(obj['First Name'] + ' ' + obj['Last Name'])
    $('.contact_current_phonenumber').text(obj['Phone Number']);
    $('.contact_current_email').text(obj['Email']);
    $('.contact_current_address').text(obj['Street'] + ' ' + obj['City'] + ', ' + obj['State'] + ' ' + obj['Zip']);
    $('#contact_current_hero').show();
  }
  
  
  var removeContact = function(number){
    for(var i = 0; i < contactsList.length; i++){
      console.log(number)
      if(contactsList[i]['Contact ID'] == number){
        contactsList.splice(i, 1)
      }
    }
  }
  
  
  
  $('body').on('submit', '.contact-input-data', function(e){
    e.preventDefault();
    contactID++
        
    var newContact = Object.create(contactTemp);
    newContact['Contact ID'] = contactID;
    newContact['First Name'] = $('#firstName').val();
    newContact['Last Name'] = $('#lastName').val();
    newContact['Phone Number'] = $('#phoneNumber').val();
    newContact['Email'] = $('#email').val();
    newContact['Street'] = $('#street').val();
    newContact['City'] = $('#city').val();
    newContact['State'] = $('#state').val();
    newContact['Zip'] = $('#zip').val();
    contactsList.push(newContact);
    
    
    
    var contact = $('.contact_template').clone(true).addClass('contact')
    contact.removeClass('contact_template');
    contact.children('.contact_id').text(newContact['Contact ID'])
    contact.children('.contact_headline').text(newContact['First Name'] + ' ' + newContact['Last Name']);
    contact.find('.contact_current_phonenumber').text(newContact['Phone Number'])
    contact.find('.contact_current_email').text(newContact['Email'])
    contact.find('.contact_current_street').text(newContact['Street'])
    contact.find('.contact_current_city').text(newContact['City'])
    contact.find('.contact_current_state').text(newContact['State'])
    contact.find('.contact_current_zip').text(newContact['Zip'])
        
    $('.contact-list-group').append(contact)
    
    console.log(contactsList)

    clearFields();
  })
  
  
  $('body').on('click', '.contact', function(){
    
    if($(this).siblings('.contact').find('.contact_current_info').is(':visible')){
      $(this).siblings('.contact').find('.contact_current_info').slideUp('slow')
    }
    
    if($(this).find('.contact_current_info').is(':hidden')){
      $(this).find('.contact_current_info').slideDown('slow')       
    }else{
        
      $('body').on('click', '.contact_headline', function(){
        $(this).siblings('.contact_current_info').slideUp('slow');
      })
      
      // $('body').on('click', '.contact_current_info_phonenumber_left', function(){
        
      //   console.log('hey')
        
      //   $(this).siblings('.contact_current_info_phonenumber_number').html('<form><input type="text" > </form>')
      // })
    }
   
    
    
    // $('.contact_current_info').slideUp('slow');
  
    
    // if($(this).find('.contact_current_info').is(':visible')){
    //   $(this).find('.contact_current_info').slideUp('slow')
    // }else{
    //   $(this).find('.contact_current_info').slideDown('slow')
    // }
    
    // $('body').on('click', '.contact_headline', function(){
    //   $(this).find('contact_current_info').slideUp('slow');
    // })
        
  });
  
  
  $('body').on('click', '.contact_options_delete', function(){
   
    var contactID = $(this).closest('.contact_current_info').siblings('.contact_id').text();    
    removeContact(contactID)
    $(this).closest('.contact').remove();
  })
  
  $('body').on('click', '.contact_current_info_phonenumber_left', function(){
    var number = $(this).siblings('.contact_current_info_phonenumber_right').find('.contact_current_phonenumber').text();

    $(this).siblings('.contact_current_info_phonenumber_right').find('.contact_current_info_phonenumber_number').html('<form class="form-edit"><input type="text" class="input-edit" value=' + number + '></form>')
  
    $('body').on('keypress', '.form-edit', function(e){        
        if(e.keyCode == 13){
          e.preventDefault();
          
          console.log(contactsList[0]['Phone Number'])
          
          var value = $(this).find('.input-edit').val();
          var id = $(this).closest('.contact_current_info').siblings('.contact_id').text()
        
          for(var i=0; i<contactsList.length; i++){
            if(contactsList[i]['Contact ID'] == id){
              contactsList[i]['Phone Number'] = value;
            }
          }  
          
          $(this).parent().html('<span class="contact_current_phonenumber">' + value + '</span>')
          console.log(contactsList)
        }

    })
  });
  
  $('body').on('click', '.contact_current_info_email_left', function(){
    var address = $(this).siblings('.contact_current_info_email_right').find('.contact_current_email').text();
    
    $(this).siblings('.contact_current_info_email_right').find('.contact_current_info_email_address').html('<form class="form-edit"><input type="text" class="input-edit" value=' + address + '></form>')


    $('body').on('keypress', '.form-edit', function(e){
      if(e.keyCode == 13){
        e.preventDefault();
        
        var value = $(this).find('.input-edit').val();
        var id = $(this).closest('.contact_current_info').siblings('.contact_id').text()
      
        for(var i=0; i<contactsList.length; i++){
          if(contactsList[i]['Contact ID'] == id){
            contactsList[i]['Email'] = value;
          }
        }
        
        $(this).parent().html('<span class="contact_current_email">' + value + '</span>');

      }
    })
  });
  
    $('body').on('click', '.contact_current_info_address_left', function(){
    
    var street = $(this).siblings('.contact_current_info_address_right').find('.contact_current_street').text();
    var city = $(this).siblings('.contact_current_info_address_right').find('.contact_current_city').text();
    var state = $(this).siblings('.contact_current_info_address_right').find('.contact_current_state').text();
    var zip = $(this).siblings('.contact_current_info_address_right').find('.contact_current_zip').text();
    
    $(this).siblings('.contact_current_info_address_right').html('<form class="form-edit"><input type="text" class="input-edit input-edit-street" value=' + street + '><input type="text" class="input-edit input-edit-city" value=' + city + '><input type="text" class="input-edit input-edit-state" value=' + state + '><input type="text" class="input-edit input-edit-zip" value=' + zip + '></form>')
      
    
    
    
    



    $('body').on('keypress', '.form-edit', function(e){
      if(e.keyCode == 13){
        e.preventDefault();
        
        var value = $(this).find('.input-edit').val();
        var id = $(this).closest('.contact_current_info').siblings('.contact_id').text()
      
        for(var i=0; i<contactsList.length; i++){
          if(contactsList[i]['Contact ID'] == id){
            contactsList[i]['Email'] = value;
          }
        }
        
        $(this).parent().html('<span class="contact_current_email">' + value + '</span>');

      }
    })
  })
  
})








