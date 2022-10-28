namespace Terrasoft.Configuration
{

	using System;
	using System.Collections.Generic;
	using System.Collections.ObjectModel;
	using System.Globalization;
	using Terrasoft.Common;
	using Terrasoft.Core;
	using Terrasoft.Core.Configuration;

	#region Class: UsrRealtyEntitiyEventListenerSchema

	/// <exclude/>
	public class UsrRealtyEntitiyEventListenerSchema : Terrasoft.Core.SourceCodeSchema
	{

		#region Constructors: Public

		public UsrRealtyEntitiyEventListenerSchema(SourceCodeSchemaManager sourceCodeSchemaManager)
			: base(sourceCodeSchemaManager) {
		}

		public UsrRealtyEntitiyEventListenerSchema(UsrRealtyEntitiyEventListenerSchema source)
			: base( source) {
		}

		#endregion

		#region Methods: Protected

		protected override void InitializeProperties() {
			base.InitializeProperties();
			UId = new Guid("e3dc1aa3-5989-4305-8876-d57d09cee773");
			Name = "UsrRealtyEntitiyEventListener";
			ParentSchemaUId = new Guid("50e3acc0-26fc-4237-a095-849a1d534bd3");
			CreatedInPackageId = new Guid("1bd5ba2a-9958-4676-8d7c-1e626edb840c");
			ZipBody = new byte[] { 31,139,8,0,0,0,0,0,4,0,141,82,193,78,227,48,16,61,111,190,98,20,113,72,36,20,193,149,178,72,180,20,84,9,193,138,182,123,89,113,112,157,105,48,114,236,200,118,10,89,212,127,103,108,183,208,4,14,188,83,52,126,243,230,189,201,128,98,53,218,134,113,132,5,26,195,172,94,187,98,162,213,90,84,173,97,78,104,149,188,37,64,104,173,80,21,204,59,235,176,30,29,84,14,187,12,22,83,229,132,19,104,127,64,41,166,27,84,110,199,252,23,170,93,40,221,10,26,162,208,100,115,254,132,53,187,35,135,240,27,210,165,53,15,200,164,235,186,52,127,12,77,77,187,146,130,3,151,204,90,136,111,223,200,192,25,140,153,197,111,94,130,72,140,119,32,167,55,228,87,148,8,27,45,74,184,87,51,101,209,56,10,146,233,213,51,114,7,22,85,137,230,24,162,226,24,215,148,42,232,94,154,202,2,230,31,130,159,210,30,43,50,81,28,202,237,117,48,31,245,136,81,23,76,8,68,201,179,88,200,35,191,207,45,145,139,154,73,104,140,224,126,75,177,169,184,65,183,232,26,44,39,90,182,181,250,203,100,139,231,59,234,69,230,55,249,199,243,151,243,171,116,48,91,172,33,139,90,23,112,122,178,71,62,136,226,129,197,204,78,152,226,40,177,164,193,206,180,56,250,66,178,206,248,11,160,19,179,172,194,5,214,141,100,142,124,38,191,60,118,102,151,180,16,58,57,69,187,165,123,243,222,111,53,103,82,252,103,43,137,243,160,144,125,254,253,120,62,253,31,153,30,67,26,66,206,236,66,235,177,168,124,172,48,162,111,128,124,198,66,113,173,77,205,92,54,48,70,50,167,197,201,248,104,184,21,15,247,100,244,11,40,124,129,233,43,199,198,91,221,183,15,216,219,164,255,181,77,182,239,157,76,5,126,103,3,0,0 };
		}

		protected override void InitializeLocalizableStrings() {
			base.InitializeLocalizableStrings();
			SetLocalizableStringsDefInheritance();
			LocalizableStrings.Add(CreateValueIsTooBigLocalizableString());
		}

		protected virtual SchemaLocalizableString CreateValueIsTooBigLocalizableString() {
			SchemaLocalizableString localizableString = new SchemaLocalizableString() {
				UId = new Guid("80d0c672-b160-cdb5-c0e0-9f9c6d587733"),
				Name = "ValueIsTooBig",
				CreatedInPackageId = new Guid("1bd5ba2a-9958-4676-8d7c-1e626edb840c"),
				CreatedInSchemaUId = new Guid("e3dc1aa3-5989-4305-8876-d57d09cee773"),
				ModifiedInSchemaUId = new Guid("e3dc1aa3-5989-4305-8876-d57d09cee773")
			};
			return localizableString;
		}

		#endregion

		#region Methods: Public

		public override void GetParentRealUIds(Collection<Guid> realUIds) {
			base.GetParentRealUIds(realUIds);
			realUIds.Add(new Guid("e3dc1aa3-5989-4305-8876-d57d09cee773"));
		}

		#endregion

	}

	#endregion

}

