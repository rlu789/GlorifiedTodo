using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net.Http;

namespace BackEnd4._5.Handlers
{
    public class AuthorizationHandler
    {
        public static bool PasswordMatched(string passwordToBeMatched, HttpRequestMessage request)
        {
            request.Headers.TryGetValues("Authorization", out IEnumerable<string> password);
            return passwordToBeMatched == null || (password != null && password.FirstOrDefault() == passwordToBeMatched) ? true : false;
        }
    }
}